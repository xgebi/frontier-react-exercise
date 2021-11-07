import React from "react";
import ElementComponent from "./Element";

type DisplaySectionProps = {
  sectionItems: Frontier.Section
}

function DisplaySection({ sectionItems }: DisplaySectionProps): JSX.Element {
  return (
    <div className={"contents"}>
      {sectionItems.content.map(section => {
        return (<ElementComponent key={section.id} data={section} passData={() => {}} />)
      })}
    </div>
  );
}
export default DisplaySection;