export async function predictDisease(image: File) {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("http://127.0.0.1:5000/predict", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function chatWithBot(message: string) {
  const res = await fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  return res.json();
}
