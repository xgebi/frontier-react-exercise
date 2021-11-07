import React, {useState} from 'react';
import formInstructions from '../data/form_instructions.json';
import DisplaySection from "./DisplaySection";

function App() {
  const job = formInstructions as Frontier.Job;
  const [page, setPage] = useState(0)

  return (
    <main>
      <article>
        <h1>{job.sections[page].title}</h1>
        <DisplaySection sectionItems={job.sections[page]} />
      </article>
      {page > 0 && <button className={"previous-button"} onClick={() => setPage(page - 1)}>Previous</button>}
      {page < job.sections.length - 1 && <button className={"next-button"} onClick={() => setPage(page + 1)}>Next</button>}
    </main>
  );
}

export default App;
