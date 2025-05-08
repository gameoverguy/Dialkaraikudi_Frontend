import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss({
    config: {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          animation: {
            'spin-slow': 'spin 3s linear infinite',
            'bounce-slow': 'bounce 2s infinite',
          },
          keyframes: {
            spin: {
              'from': { transform: 'rotate(0deg)' },
              'to': { transform: 'rotate(360deg)' },
            },
            bounce: {
              '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
              '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
            },
          },
          dropShadow: {
            'glow': '0 0 15px rgba(255,255,255,0.7)',
          },
        },
      },
    }
  })],
});
