import Initial from "../../components/auth/Initial";

// El proveedor Auth0 vive en _app, sin reiniciarse en cada página.
export default function Lobby() {
  return <Initial />;
}
