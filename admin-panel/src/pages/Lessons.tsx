import { useEffect, useState } from "react";
import { api, type Lesson } from "../lib/api";

export default function Lessons() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | Lesson | null>(null);
  const [form, setForm] = useState({ title: "", duration: "", level: "", order: 0, description: "", difficulty: "", enabled: true, videoUrl: "", activities: [] as any[] });

  const load = () => {
    setLoading(true);
    api<{ lessons: Lesson[] }>("/api/admin/lessons")
      .then((r) => setLessons(r.lessons))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => load(), []);

  const openAdd = () => {
    setForm({ title: "", duration: "", level: "", order: lessons.length, description: "", difficulty: "", enabled: true, videoUrl: "", activities: [] });
    setModal("add");
  };
  const openEdit = (l: Lesson) => {
    setForm({
      title: l.title,
      duration: l.duration ?? "",
      level: l.level ?? "",
      order: l.order ?? 0,
      description: (l as { description?: string }).description ?? "",
      difficulty: (l as { difficulty?: string }).difficulty ?? "",
      enabled: (l as { enabled?: boolean }).enabled !== false,
      videoUrl: (l as any).videoUrl ?? "",
      activities: (l as any).activities ?? [],
    });
    setModal(l);
  };
  const closeModal = () => setModal(null);

  const saveAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      await api("/api/admin/lessons", {
        method: "POST",
        body: JSON.stringify({
          title: form.title.trim(),
          duration: form.duration.trim() || undefined,
          level: form.level.trim() || undefined,
          order: form.order,
          description: form.description.trim() || undefined,
          difficulty: form.difficulty.trim() || undefined,
          enabled: form.enabled,
          videoUrl: form.videoUrl.trim() || undefined,
          activities: form.activities,
        }),
      });
      closeModal();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create");
    }
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof modal !== "object" || modal === null || !form.title.trim()) return;
    const lessonId = modal.id;
    try {
      await api(`/api/admin/lessons/${lessonId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: form.title.trim(),
          duration: form.duration.trim() || undefined,
          level: form.level.trim() || undefined,
          order: form.order,
          description: form.description.trim() || undefined,
          difficulty: form.difficulty.trim() || undefined,
          enabled: form.enabled,
          videoUrl: form.videoUrl.trim() || undefined,
          activities: form.activities,
        }),
      });
      closeModal();
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Delete this lesson?")) return;
    try {
      await api(`/api/admin/lessons/${id}`, { method: "DELETE" });
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    }
  };

  if (error && lessons.length === 0) {
    return (
      <div>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Lessons</h1>
          <button type="button" onClick={load} className="admin-btn admin-btn-primary">Retry</button>
        </div>
        <div className="admin-alert admin-alert-error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Lessons</h1>
          <p className="admin-page-subtitle">Manage lesson content.</p>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" onClick={load} disabled={loading} className="admin-btn admin-btn-secondary">
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button type="button" onClick={openAdd} className="admin-btn admin-btn-primary">
            Add lesson
          </button>
        </div>
      </div>
      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      <div className="admin-table-wrap" style={{ position: "relative" }}>
        {loading && lessons.length === 0 && (
          <div className="admin-loading" style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.8)", zIndex: 1 }}>
            <div className="admin-spinner" />
          </div>
        )}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Level</th>
              <th>Difficulty</th>
              <th>Enabled</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.map((l) => (
              <tr key={l.id}>
                <td>{l.title}</td>
                <td>{l.duration ?? "—"}</td>
                <td>{l.level ?? "—"}</td>
                <td>{(l as { difficulty?: string }).difficulty ?? "—"}</td>
                <td>{(l as { enabled?: boolean }).enabled !== false ? "Yes" : "No"}</td>
                <td style={{ textAlign: "right" }}>
                  <button type="button" onClick={() => openEdit(l)} className="admin-btn admin-btn-secondary" style={{ padding: "0.25rem 0.6rem", marginRight: 8 }}>
                    Edit
                  </button>
                  <button type="button" onClick={() => deleteLesson(l.id)} className="admin-btn admin-btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="admin-modal-title">{modal === "add" ? "Add lesson" : "Edit lesson"}</h2>
            <form onSubmit={modal === "add" ? saveAdd : saveEdit}>
              <div className="admin-form-group">
                <label className="admin-form-label">Title *</label>
                <input
                  className="admin-input"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Duration</label>
                <input
                  className="admin-input"
                  value={form.duration}
                  onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                  placeholder="e.g. 12 min"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Level</label>
                <input
                  className="admin-input"
                  value={form.level}
                  onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                  placeholder="e.g. 1"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Order</label>
                <input
                  type="number"
                  className="admin-input"
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: parseInt(e.target.value, 10) || 0 }))}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Description</label>
                <textarea
                  className="admin-textarea"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Difficulty</label>
                <input
                  className="admin-input"
                  value={form.difficulty}
                  onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                  placeholder="e.g. 1 or Beginner"
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">
                  <input
                    type="checkbox"
                    checked={form.enabled}
                    onChange={(e) => setForm((f) => ({ ...f, enabled: e.target.checked }))}
                  />{" "}
                  Lesson enabled
                </label>
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">YouTube Video URL</label>
                <input
                  className="admin-input"
                  value={form.videoUrl}
                  onChange={(e) => setForm((f) => ({ ...f, videoUrl: e.target.value }))}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="admin-form-group">
                <label className="admin-form-label">Activities</label>
                <div style={{ background: "#f8f9fa", padding: "1rem", borderRadius: "8px", border: "1px solid #dee2e6" }}>
                  {form.activities.map((act: any, idx: number) => (
                    <div key={idx} style={{ marginBottom: "1rem", paddingBottom: "1rem", borderBottom: "1px solid #eee" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ fontWeight: "700", textTransform: "capitalize" }}>{act.type} Activity</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newAct = [...form.activities];
                            newAct.splice(idx, 1);
                            setForm({ ...form, activities: newAct });
                          }}
                          style={{ color: "#dc3545", background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
                        >
                          Remove
                        </button>
                      </div>
                      <div className="admin-form-group">
                        <label className="admin-form-label" style={{ fontSize: "0.8rem" }}>Prompt / Question</label>
                        <input
                          className="admin-input"
                          value={act.prompt || act.question || ""}
                          onChange={(e) => {
                            const newAct = [...form.activities];
                            newAct[idx] = { ...newAct[idx], prompt: e.target.value, question: e.target.value };
                            setForm({ ...form, activities: newAct });
                          }}
                          placeholder="What to show the user?"
                        />
                      </div>
                      {act.type === "typing" || act.type === "mc" ? (
                        <div className="admin-form-group">
                          <label className="admin-form-label" style={{ fontSize: "0.8rem" }}>Correct Answer</label>
                          <input
                            className="admin-input"
                            value={act.correctAnswer || ""}
                            onChange={(e) => {
                              const newAct = [...form.activities];
                              newAct[idx] = { ...newAct[idx], correctAnswer: e.target.value };
                              setForm({ ...form, activities: newAct });
                            }}
                          />
                        </div>
                      ) : null}
                      {act.type === "mc" && (
                        <div className="admin-form-group">
                          <label className="admin-form-label" style={{ fontSize: "0.8rem" }}>Options (comma separated)</label>
                          <input
                            className="admin-input"
                            value={act.options?.join(", ") || ""}
                            onChange={(e) => {
                              const newAct = [...form.activities];
                              newAct[idx] = { ...newAct[idx], options: e.target.value.split(",").map(t => t.trim()) };
                              setForm({ ...form, activities: newAct });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => setForm({ ...form, activities: [...form.activities, { id: Date.now().toString(), type: "typing", prompt: "", correctAnswer: "" }] })}
                    >
                      + Typing
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => setForm({ ...form, activities: [...form.activities, { id: Date.now().toString(), type: "mc", question: "", correctAnswer: "", options: [] }] })}
                    >
                      + MC
                    </button>
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      style={{ fontSize: "0.75rem" }}
                      onClick={() => setForm({ ...form, activities: [...form.activities, { id: Date.now().toString(), type: "audio", prompt: "" }] })}
                    >
                      + Audio
                    </button>
                  </div>
                </div>
              </div>
              <div className="admin-form-actions">
                <button type="button" onClick={closeModal} className="admin-btn admin-btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  {modal === "add" ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
