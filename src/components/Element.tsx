import React, {FocusEventHandler, useState} from 'react';

type ElementComponentProps = {
  data: Frontier.Element,
  passData: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>,
}

function RadioComponent({ data, passData }: ElementComponentProps): JSX.Element {
  console.log('radio', data);
  return (
    <div>
      <label htmlFor={data.id}>
        <input type="checkbox" />
        {data.question_text}
      </label>
    </div>
  );
}

function MultiChoiceComponent({ data, passData }: ElementComponentProps): JSX.Element {
  console.log('multichoice', data);
  const [dropdownVisible, setDropdownVisible] = useState(true);
  return (
    <div>
      <span>{data.question_text}</span>
      <div className={`dropdown ${dropdownVisible ? '': 'hidden'}`}>
        {data.metadata.options?.map(option => {
          return (
            <div>
              <input type="checkbox" />
              <label>{option.label}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TextComponent({ data, passData }: ElementComponentProps): JSX.Element {
  const input = (): JSX.Element => {
    switch (data.metadata.format) {
      case "text":
        return (
          <input
            id={data.id}
            name={data.id}
            type={data.metadata.format}
            required={data.metadata.required}
            placeholder={data.metadata.placeholder}
            onBlur={passData}/>
        )
      case "email":
        return (
          <input
            id={data.id}
            name={data.id}
            type={data.metadata.format}
            required={data.metadata.required}
            pattern={data.metadata.pattern}
            placeholder={data.metadata.placeholder}
            onBlur={passData}/>
        )
      case "number":
        return (
          <input
            id={data.id}
            name={data.id}
            type={data.metadata.format}
            required={data.metadata.required}
            placeholder={data.metadata.placeholder}
            step={data.metadata.step}
            onBlur={passData}/>
        )
      default:
        return (
          <input
            id={data.id}
            name={data.id}
            type={"text"}
            onBlur={passData}/>
        )
    }
  }
  return (
    <div className={"element"}>
      <label htmlFor={data.id}>{data.question_text}</label>
      {input()}
    </div>
  );
}

function TextareaComponent({ data, passData }: ElementComponentProps): JSX.Element {

  return (
    <div className={"element"}>
      <label htmlFor={data.id}>{data.question_text}</label>
      <textarea
        id={data.id}
        name={data.id}
        onBlur={passData}
        required={data.metadata.required}
      />
    </div>
  );
}

function ElementComponent({ data, passData }: ElementComponentProps): JSX.Element {
  switch (data.type) {
    case "boolean": return (<RadioComponent data={data} passData={passData} />)
    case "multichoice": return (<MultiChoiceComponent data={data} passData={passData} />);
    case "text": return (<TextComponent data={data} passData={passData} />)
    case "textarea": return (<TextareaComponent data={data} passData={passData} />)
    default:
      return (<span />);
  }
}
export default ElementComponent;
export { RadioComponent, MultiChoiceComponent, TextareaComponent, TextComponent };