import { ToastAndroid } from "react-native";
const API_URL = process.env.API_URL || "";
const FRIENDLI_URL = process.env.EXPO_PUBLIC_FRIENDLI_URL || "";
const FRIENDLI_MODEL = process.env.EXPO_PUBLIC_FRIENDLI_MODEL || "";
const FRIENDLI_TOKEN = process.env.EXPO_PUBLIC_FRIENDLI_TOKEN || "";

export async function uploadImageForOCR(filePath: string) {
  const formData = new FormData();
  const file = {
    uri: filePath,
    name: "adaptive-icon.png",
    type: "image/png",
  };

  formData.append("file", file as any);

  try {
    const OCRresponse = await fetch(`${API_URL}/api/ocr-extract`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        // Do NOT set 'Content-Type'; fetch with FormData handles it automatically
      },
    });
    if (OCRresponse.ok) {
      const OCRresult = await OCRresponse.json();
      const { response, result } = await extractMedicalCodes(
        OCRresult.extracted_text
      );
      return { response, result };
    }

    if (!OCRresponse.ok) {
      throw new Error(`Server error: ${OCRresponse.status}`);
    }
    return { response: OCRresponse, result: null };
  } catch (error) {
    ToastAndroid.show(
      "Facing some technical issue while extracting image content",
      ToastAndroid.SHORT
    );
    return { response: null, result: null };
  }
}

export async function extractMedicalCodes(text: string) {
  try {
    const response = await fetch(`${API_URL}/api/code-extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();

    return { response, result };
  } catch (error) {
    ToastAndroid.show(
      "Facing some technical issue while extracting codes",
      ToastAndroid.SHORT
    );
    return { response: null, result: null };
  }
}

export async function getFriendliResponse(content: string) {
  const url = `${FRIENDLI_URL}`;
  const payload = {
    model: FRIENDLI_MODEL,
    messages: [
      {
        role: "user",
        content: content,
      },
    ],
    max_tokens: 100,
    top_p: 0.8,
    temperature: 1.0,
    stream: false,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FRIENDLI_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log("Assistant response:", data.choices?.[0]?.message?.content);
    return data.choices?.[0]?.message?.content;
  } catch (error) {
    ToastAndroid.show(
      "Facing some technical issue while generating response",
      ToastAndroid.SHORT
    );
  }
}
