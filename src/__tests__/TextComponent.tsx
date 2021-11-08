import '@testing-library/jest-dom'
import {render, fireEvent, screen} from '@testing-library/react'
import * as React from 'react'
import {TextComponent} from "../components/Element";

test('Text input is rendered', () => {
  const textData: Frontier.Element = {
    id: "1",
    question_text: "Is this important",
    metadata: {
      required: false,
    },
    type: "text",
  }
  render(<TextComponent data={textData} passData={() => {}}  appState={new Map<string, string>()}/>)
  expect(screen.queryByText(textData.question_text)).toBeTruthy()
})