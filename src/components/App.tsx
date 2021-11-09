import React, {useEffect, useState} from 'react';
import formInstructions from '../data/form_instructions.json';
import DisplaySection from "./DisplaySection";

/**
 * Function which serves as base function for the application
 * @constructor
 */
function App() {
  const job = formInstructions as Frontier.Job;
  const [page, setPage] = useState(0)
  /**
   * Notes for choosing Map<string, string>.
   *
   * Another assumption, the app will never know what will arrive. The form elements would be fetched from
   * server instead of living in a folder. Creating a dynamic interface to store in the state is at the
   * moment above my skill level. So storing everything in plain text and having easy access in key-value
   * object seemed as a good tradeoff.
   */
  const [data, setData] = useState(new Map<string, string>())
  useEffect(() => {
    const data = new Map();
    for (let i = 0; i < job.sections.length; i++) {
      for (const element of job.sections[i].content) {
        data.set(element.id, "");
      }
    }
    setData(data);
  }, [])

  /**
   * Function which serves as event listener to data change from components
   * @param passedData
   */
  const processData = (passedData: { id: string, value: string, remove?: boolean }) => {
    data.set(passedData.id, passedData.value);
    setData(data);

  }

  const style: any = {
    "--primary-color": job.theme.primary_color!,
    "--secondary-color": job.theme.secondary_color!,
    "--background-color": job.theme.background_color!,
    "--text-color": job.theme.text_color!
  }

  return (
    <main style={style}>
      <div className={"steps-counter"}>Step {page + 1} of {job.sections.length}</div>
      <article>
        <h1>{job.sections[page].title}</h1>
        <DisplaySection sectionItems={job.sections[page]} passData={processData} appState={data}/>
      </article>
      {page > 0 && <button className={"previous-button"} onClick={() => setPage(page - 1)}>Previous</button>}
      {page < job.sections.length - 1 && <button className={"next-button"} onClick={() => setPage(page + 1)}>Next</button>}
      {page === job.sections.length - 1 && <button className={"next-button"} onClick={() => {console.log(data)}}>Submit</button>}
    </main>
  );
}

export default App;
