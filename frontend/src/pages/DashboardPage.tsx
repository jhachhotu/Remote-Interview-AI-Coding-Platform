import { useEffect, useState } from "react";
import { api } from "@/api/client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

type Interview = {
  id: number;
  title: string;
  room_code: string;
  scheduled_at: string;
};

export default function DashboardPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    api.get<Interview[]>("/api/interviews/").then((r) => setInterviews(r.data)).catch(() => setInterviews([]));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <button className="text-sm underline" onClick={logout}>Logout</button>
      </div>
      <div className="space-y-3">
        {interviews.map((iv) => (
          <div key={iv.id} className="border rounded p-4 flex items-center justify-between bg-white">
            <div>
              <div className="font-medium">{iv.title}</div>
              <div className="text-sm text-gray-600">{new Date(iv.scheduled_at).toLocaleString()}</div>
            </div>
            <button className="bg-black text-white px-3 py-1 rounded" onClick={() => navigate(`/room/${iv.room_code}`)}>Join</button>
          </div>
        ))}
        {interviews.length === 0 && <div className="text-gray-700">No interviews yet.</div>}
      </div>
    </div>
  );
}

