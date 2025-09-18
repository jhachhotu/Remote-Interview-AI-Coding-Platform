import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white shadow p-6 rounded">
        <h1 className="text-xl font-semibold mb-4">Sign in</h1>
        <label className="block mb-2 text-sm">Username</label>
        <input className="w-full border rounded px-3 py-2 mb-4" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label className="block mb-2 text-sm">Password</label>
        <input type="password" className="w-full border rounded px-3 py-2 mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="text-red-600 text-sm mb-3">{error}</div>}
        <button disabled={loading} className="w-full bg-black text-white py-2 rounded disabled:opacity-50">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

