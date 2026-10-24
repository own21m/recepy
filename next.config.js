// Se conserva Pages Router para respetar la estructura del proyecto original.
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // La aplicación es pequeña; un solo trabajador evita picos de memoria al compilar.
  experimental: {
    cpus: 1,
  },
};

module.exports = nextConfig;
