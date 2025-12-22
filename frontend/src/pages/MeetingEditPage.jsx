import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function MeetingEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    category: "",
    content: "",
    location: "",
    maxMembers: 2,
    imageUrl: "",
  });
  const [meetingDate, setMeetingDate] = useState("");

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await api.get(`meetings/${id}`);
        const data = res.data || {};

        setForm({
          title: data.title ?? "",
          category: data.category ?? "",
          content: data.content ?? "",
          location: data.location ?? "",
          maxMembers: data.maxMembers ?? 2,
          imageUrl: data.imageUrl ?? "",
        });
        setMeetingDate(data.meetingDate ?? "");
      } catch (err) {
        console.error(err);
        alert("데잍를 불러오는데 실패했습니다.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const submitData = {
        ...form,
        meetingDate: meetingDate === "" ? null : meetingDate,
      };

      await api.put(`meetings/${id}`, submitData);
      alert("변경되었습니다.");
      navigate(`/meetings/${id}`);
    } catch (err) {
      console.error(err);
      alert("변경 실패.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9fb]">
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-10">Loading...</main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 px-14 py-10">
          <h1 className="text-2xl font-bold mb-8">Edit Meeting</h1>

          <div className="bg-white rounded-2xl shadow p-8 max-w-2xl">
            <div className="mb-5">
              <label className="block mb-1 font-semibold">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Meeting title"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-semibold">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Sport / Study / Hobby"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-semibold">Content</label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-lg p-3"
                placeholder="Describe the meeting"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-semibold">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-semibold">Meeting Date</label>
              <input
                type="datetime-local"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-semibold">Max Members</label>
              <input
                type="number"
                name="maxMembers"
                value={form.maxMembers}
                onChange={handleChange}
                min={2}
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div className="mb-8">
              <label className="block mb-1 font-semibold">Image URL (없을경우 지도가 대표이미지로 등록됩니다.)</label>
              <input
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                placeholder="Image URL"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
