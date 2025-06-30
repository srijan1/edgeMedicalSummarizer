const API_URL =
  "https://6379-2409-40d0-1486-505c-e1d2-9424-cafc-49a.ngrok-free.app";

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
    // console.error("Error uploading image:", error);
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
    console.error("Error calling code-extract API:", error);
    return { response: null, result: null };
  }
}
