import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect, useRef } from "react";
import { colors, spacing, fontSize, borderRadius } from "@/theme";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import YoutubePlayer from "react-native-youtube-iframe";
import { Audio } from "expo-av";

export default function ActiveLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = Video, 1+ = Activities
  const [answers, setAnswers] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [score, setScore] = useState<{ score: number; passed: boolean } | null>(null);

  // Audio recording state
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`${api.getBaseUrl()}/api/lessons/${id}`);
        const data = await res.json();
        setLesson(data);
        setAnswers(new Array((data.activities || []).length).fill(""));
      } catch (err) {
        Alert.alert("Error", "Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  const handleNext = () => {
    if (currentStep < (lesson?.activities?.length || 0)) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const res = await api.submitLesson(id!, answers);
      setScore(res);
    } catch (err) {
      Alert.alert("Error", "Failed to submit answers");
    } finally {
      setIsSubmitting(false);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
    } catch (err) {
      Alert.alert("Error", "Failed to start recording");
    }
  };

  const stopRecording = async (index: number) => {
    setRecording(null);
    await recording?.stopAndUnloadAsync();
    const uri = recording?.getURI();
    const newAnswers = [...answers];
    newAnswers[index] = uri; // In real app, upload this to storage
    setAnswers(newAnswers);
  };

  if (loading) return <View style={{ flex: 1, justifyContent: "center" }}><ActivityIndicator size="large" color={colors.primary} /></View>;
  if (!lesson) return <View style={{ flex: 1, justifyContent: "center" }}><Text>Lesson not found</Text></View>;

  if (score) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background, padding: spacing.xl, justifyContent: "center", alignItems: "center" }}>
        <Ionicons name={score.passed ? "checkmark-circle" : "close-circle"} size={80} color={score.passed ? colors.success : colors.danger} />
        <Text style={{ fontSize: fontSize["3xl"], fontWeight: "800", marginTop: spacing.md }}>{score.score}%</Text>
        <Text style={{ fontSize: fontSize.lg, color: colors.mutedForeground, textAlign: "center", marginVertical: spacing.lg }}>
          {score.passed ? "Mwarangije isomo neza! Urwego rwanyu rwiyongereye." : "Ntabwo mwashoboye gutsinda isomo. Mukomerezeho mwongere mugerageze."}
        </Text>
        <Button
          title={score.passed ? "Subira ku Meza" : "Ongera Ugerageze"}
          onPress={() => score.passed ? router.replace("/(tabs)/lessons") : setScore(null)}
          variant="primary"
          style={{ width: "100%" }}
        />
      </SafeAreaView>
    );
  }

  const activities = lesson.activities || [];
  const isVideoStep = currentStep === 0;
  const currentActivity = isVideoStep ? null : activities[currentStep - 1];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }} edges={["top"]}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: spacing.md }}><Ionicons name="arrow-back" size={24} /></TouchableOpacity>
        <Text style={{ fontSize: fontSize.lg, fontWeight: "700" }}>{lesson.title}</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.md }}>
        {/* Progress Bar */}
        <View style={{ height: 6, backgroundColor: colors.muted, borderRadius: 3, marginBottom: spacing.lg }}>
          <View style={{ width: `${(currentStep / (activities.length + 1)) * 100}%`, height: "100%", backgroundColor: colors.primary, borderRadius: 3 }} />
        </View>

        {isVideoStep ? (
          <View>
            <Text style={{ fontSize: fontSize.xl, fontWeight: "700", marginBottom: spacing.md }}>Iga Gusoma no Kwandika</Text>
            {lesson.videoUrl ? (
              <YoutubePlayer height={220} videoId={lesson.videoUrl.split("v=")[1]?.split("&")[0] || lesson.videoUrl.split("/").pop()} />
            ) : (
              <View style={{ height: 200, backgroundColor: colors.muted, justifyContent: "center", alignItems: "center" }}>
                <Text>No video available</Text>
              </View>
            )}
            <Text style={{ marginTop: spacing.lg, color: colors.mutedForeground, lineHeight: 24 }}>{lesson.description}</Text>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: fontSize.lg, fontWeight: "700", marginBottom: spacing.lg }}>{currentActivity.prompt}</Text>

            {currentActivity.type === "typing" && (
              <TextInput
                style={{ borderWidth: 2, borderColor: colors.primary, borderRadius: borderRadius.md, padding: spacing.md, fontSize: fontSize.lg }}
                value={answers[currentStep - 1]}
                onChangeText={(text) => {
                  const newAnswers = [...answers];
                  newAnswers[currentStep - 1] = text;
                  setAnswers(newAnswers);
                }}
                autoFocus
                placeholder="Andika hano..."
              />
            )}

            {currentActivity.type === "mc" && (
              <View style={{ gap: spacing.sm }}>
                {(currentActivity.options || []).map((opt: string) => (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => {
                      const newAnswers = [...answers];
                      newAnswers[currentStep - 1] = opt;
                      setAnswers(newAnswers);
                    }}
                    style={{
                      padding: spacing.lg,
                      borderRadius: borderRadius.md,
                      borderWidth: 2,
                      borderColor: answers[currentStep - 1] === opt ? colors.primary : colors.border,
                      backgroundColor: colors.card
                    }}
                  >
                    <Text style={{ fontWeight: "600" }}>{opt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {currentActivity.type === "audio" && (
              <View style={{ alignItems: "center", padding: spacing.xl }}>
                <TouchableOpacity
                  onPressIn={startRecording}
                  onPressOut={() => stopRecording(currentStep - 1)}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: recording ? colors.danger : colors.primary,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Ionicons name={recording ? "mic" : "mic-outline"} size={40} color="#fff" />
                </TouchableOpacity>
                <Text style={{ marginTop: spacing.md, color: colors.mutedForeground }}>
                  {recording ? "Kurura ukura uruhushya..." : "Kanda hano ufate amajwi"}
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <View style={{ padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.border }}>
        <Button
          title={isVideoStep ? "Tangira Imyitozo" : (currentStep === activities.length ? "Ohereza" : "Komeza")}
          onPress={handleNext}
          disabled={!isVideoStep && !answers[currentStep - 1] && currentActivity.type !== "audio"}
          loading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
}
