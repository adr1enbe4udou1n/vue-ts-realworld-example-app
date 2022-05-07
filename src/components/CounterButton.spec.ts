import { render, fireEvent } from "@testing-library/vue"
import CounterButton from "./CounterButton.vue"

import { describe, expect, it } from "vitest"

describe("CounterButton", () => {
  it("should render", async () => {
    const { getByText } = render(CounterButton, { props: { initial: 10 } })

    expect(getByText("Count is 10")).toBeTruthy()
  })

  it("should be interactive", async () => {
    const { getByText, container } = render(CounterButton)

    expect(getByText("Count is 0")).toBeTruthy()

    const button = container.querySelector(".inc")!

    await fireEvent.click(button)
    await fireEvent.click(button)

    expect(getByText("Count is 2")).toBeTruthy()
  })
})
