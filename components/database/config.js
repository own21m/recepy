// La conexión se carga solo en modo Firebase; la demo no hace peticiones.
export async function fetchCloudRecipes() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  if (!config.apiKey || !config.projectId || !config.appId) {
    throw new Error(
      "Falta configurar Firebase. Revisa las variables de entorno del README.",
    );
  }
  // No se reutiliza la configuración del proyecto estudiantil original.
  const [{ initializeApp, getApps, getApp }, { getFirestore, collection, getDocs }] =
    await Promise.all([import("firebase/app"), import("firebase/firestore")]);
  const app = getApps().length ? getApp() : initializeApp(config);
  const snapshot = await getDocs(collection(getFirestore(app), "recipes"));
  // Auth0 no autoriza Firebase por sí solo: esta integración solo permite lectura.
  return snapshot.docs.map((document) => {
    const record = document.data();
    const text = (value) => (typeof value === "string" ? value : "");
    return {
      id: document.id,
      name: text(record.name) || "Receta sin nombre",
      author: text(record.author) || "Autor sin nombre",
      idAuthor: text(record.idAuthor),
      description: text(record.description),
      ingredients: text(record.ingredients),
      howTo: text(record.howTo),
      type: text(record.type) || "Otro",
      image: text(record.image),
      video: text(record.video),
    };
  });
}
