import React from "react";
import ElementComponent from "./Element";

type DisplaySectionProps = {
  sectionItems: Frontier.Section,
  passData: Function,
  appState: Map<string, string>
}

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