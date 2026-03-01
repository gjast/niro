"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

type Review = {
  id: string;
  name: string;
  icon: string;
  text: string;
  date: string;
};

export default function AdminReviews() {
  const [authStatus, setAuthStatus] = useState<"checking" | "unauthenticated" | "authenticated">("checking");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    text: "",
    date: new Date().toISOString().slice(0, 10),
    icon: "",
    iconFile: null as File | null,
  });

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews");
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        setAuthStatus(data.ok ? "authenticated" : "unauthenticated");
        if (data.ok) loadReviews();
      } catch {
        setAuthStatus("unauthenticated");
      }
    })();
  }, []);

  useEffect(() => {
    if (authStatus === "authenticated") loadReviews();
  }, [authStatus]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: password.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error ?? "Ошибка входа");
        return;
      }
      setAuthStatus("authenticated");
      setPassword("");
    } catch {
      setLoginError("Ошибка сети");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      setAuthStatus("unauthenticated");
    } catch {
      setAuthStatus("unauthenticated");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.set("name", form.name.trim());
      formData.set("text", form.text.trim());
      formData.set("date", form.date);
      if (form.icon.trim()) formData.set("icon", form.icon.trim());
      if (form.iconFile) formData.set("iconFile", form.iconFile);

      const res = await fetch("/api/reviews", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Ошибка при сохранении");
        return;
      }

      setReviews((prev) => [...prev, data]);
      setForm({
        name: "",
        text: "",
        date: new Date().toISOString().slice(0, 10),
        icon: "",
        iconFile: null,
      });
    } catch {
      setError("Ошибка сети");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить этот отзыв?")) return;
    try {
      const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
      if (res.ok) setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch {
      setError("Ошибка при удалении");
    }
  };

  if (authStatus === "checking") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <p className="text-(#6C6C6C)">Проверка доступа…</p>
      </div>
    );
  }

  if (authStatus === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="MaxContainerWidth mx-auto max-w-sm w-full">
          <form
            onSubmit={handleLogin}
            className="rounded-[22px] border border-(--border-color) bg-white p-6"
          >
            <h1 className="text-[22px] font-medium mb-2">Вход в админ-панель</h1>
            <p className="text-[14px] text-(#6C6C6C) mb-4">Введите пароль для доступа</p>
            {loginError && (
              <p className="mb-4 text-red-600 text-[14px]">{loginError}</p>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль"
              className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-[16px] mb-4"
              required
              autoFocus
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-(--primary-color) px-4 py-2 text-white font-medium"
            >
              Войти
            </button>
          </form>
          <Link
            href="/"
            className="mt-4 block text-center text-(--primary-color) hover:underline text-[14px]"
          >
            ← На главную
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="MaxContainerWidth MaxContainerPadding mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-[28px] font-medium">Админ-панель: Отзывы</h1>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleLogout}
              className="text-[14px] text-(#6C6C6C) hover:text-(--primary-color)"
            >
              Выйти
            </button>
            <Link
              href="/"
              className="text-(--primary-color) hover:underline"
            >
              ← На главную
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-10 rounded-[22px] border border-(--border-color) bg-white p-6"
        >
          <h2 className="mb-4 text-[20px] font-medium">Добавить отзыв</h2>
          {error && (
            <p className="mb-4 text-red-600 text-[14px]">{error}</p>
          )}
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-[14px] text-(--black-color-2)">
                Имя / Ник
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-[16px]"
                placeholder="John Doe"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[14px] text-(--black-color-2)">
                Текст отзыва
              </label>
              <textarea
                value={form.text}
                onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-[16px] min-h-[100px]"
                placeholder="Отличный сервис..."
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[14px] text-(--black-color-2)">
                Дата
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                className="w-full rounded-lg border border-(--border-color) px-3 py-2 text-[16px]"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[14px] text-(--black-color-2)">
                Аватар (URL или загрузить файл)
              </label>
              <input
                type="url"
                value={form.icon}
                onChange={(e) => setForm((f) => ({ ...f, icon: e.target.value }))}
                className="mb-2 w-full rounded-lg border border-(--border-color) px-3 py-2 text-[16px]"
                placeholder="https://..."
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setForm((f) => ({ ...f, iconFile: e.target.files?.[0] ?? null }))
                }
                className="block w-full text-[14px]"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 rounded-lg bg-(--primary-color) px-4 py-2 text-white font-medium disabled:opacity-50"
            >
              {submitting ? "Сохранение…" : "Добавить отзыв"}
            </button>
          </div>
        </form>

        <div>
          <h2 className="mb-4 text-[20px] font-medium">Сохранённые отзывы</h2>
          {loading ? (
            <p className="text-(#6C6C6C)">Загрузка…</p>
          ) : reviews.length === 0 ? (
            <p className="text-(#6C6C6C)">Пока нет отзывов</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {reviews.map((r) => (
                <li
                  key={r.id}
                  className="flex items-start gap-4 rounded-[22px] border border-(--border-color) bg-white p-4"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-(--gray-color)">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={r.icon || "/imgs/hero.png"}
                      alt={r.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-medium">{r.name}</h4>
                    <p className="text-[14px] text-(#6C6C6C)">{r.date}</p>
                    <p className="mt-1 text-[14px] text-(--black-color-2) line-clamp-2">
                      {r.text}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    className="shrink-0 rounded px-3 py-1 text-[14px] text-red-600 hover:bg-red-50"
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
