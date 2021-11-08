import React, {useEffect, useState} from 'react';
import formInstructions from '../data/form_instructions.json';
import DisplaySection from "./DisplaySection";

function App() {
  const job = formInstructions as Frontier.Job;
  const [page, setPage] = useState(0)
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
