import { db } from "./firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function getViews(slug: string): Promise<number> {
  try {
    const doc = await db.collection("posts").doc(slug).get();
    if (!doc.exists) {
      return 0;
    }
    return doc.data()?.views || 0;
  } catch (error) {
    console.error("Error getting views", error);
    return 0;
  }
}

export async function incrementViews(slug: string): Promise<number> {
  try {
    const docRef = db.collection("posts").doc(slug);
    
    // Set with merge: true ensuring document exists and views increments
    // If it doesn't exist, it creates it. If it exists, it increments.
    // However, if it's a new doc, we want views to start at 1.
    // increment(1) works on non-existent docs by treating missing field as 0.
    await docRef.set({
      slug,
      views: FieldValue.increment(1)
    }, { merge: true });

    // We can't immediately get the updated value with a simple set.
    // So we fetch it again.
    const doc = await docRef.get();
    return doc.data()?.views || 0;
  } catch (error) {
    console.error("Error incrementing views", error);
    return 0;
  }
}

export async function getTotalViews(): Promise<number> {
  try {
    const snapshot = await db.collection("posts").get();
    let total = 0;
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.views) {
        total += data.views;
      }
    });
    return total;
  } catch (error) {
    console.error("Error getting total views", error);
    return 0;
  }
}
