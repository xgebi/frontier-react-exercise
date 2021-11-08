import React from "react";
import ElementComponent from "./Element";

/**
 * Props for DisplaySection components
 */
type DisplaySectionProps = {
  sectionItems: Frontier.Section,
  passData: Function,
  appState: Map<string, string>
}

/**
 * Display each section and creates basic element component
 *
 * @param sectionItems
 * @param passData
 * @param appState
 * @constructor
 */
function DisplaySection({ sectionItems, passData, appState }: DisplaySectionProps): JSX.Element {
  return (
    <div className={"contents"}>
      {sectionItems.content.map(section => {
        return (<ElementComponent key={section.id} data={section} passData={passData} appState={appState} />)
      })}
    </div>
  );
}
export default DisplaySection;