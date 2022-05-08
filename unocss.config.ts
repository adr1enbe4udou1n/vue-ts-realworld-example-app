import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        brand: "Titillium Web",
        heading: "Merriweather Sans",
        sans: "Source Sans Pro",
        serif: "Source Serif Pro",
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
