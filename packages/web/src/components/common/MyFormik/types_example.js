/* eslint-disable */
const fields = [
  {
    fieldName: "email",
    label: "Email Address",
    type: "text",
    options: "email",
    initialValue: ""
  },
  {
    fieldName: "password",
    label: "Password",
    type: "text",
    options: "password",
    initialValue: ""
  },
  {
    fieldName: "textarea",
    label: "Text area max size",
    type: "textarea",
    rows: 2,
    rowsMax: 4,
    initialValue: ""
  },
  {
    fieldName: "textarea2",
    label: "Text area no limit",
    type: "textarea",
    rows: 2,
    initialValue: ""
  },
  {
    fieldName: "asd",
    label: "Radio",
    type: "radio",
    options: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" }
    ],
    initialValue: ""
  },
  {
    fieldName: "asd2",
    label: "Checkbox",
    type: "checkbox",
    options: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" }
    ],
    initialValue: []
  },
  {
    fieldName: "select",
    label: "Select single",
    type: "select",
    options: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" }
    ],
    isMulti: false,
    initialValue: ""
  },
  {
    fieldName: "select2",
    label: "Select multi",
    type: "select",
    options: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" }
    ],
    isMulti: true,
    initialValue: []
  },
  {
    fieldName: "switch",
    label: "Switch example",
    type: "switch",
    initialValue: false
  },
  {
    fieldName: "custom",
    type: "other",
    props: { label: "here you can add props" },
    component: function Test({ value, setValue, errorMsg }) {
      return (
        <div>
          <div>custom component example</div>
          <div
            onClick={() => {
              setValue(value + 1);
            }}
          >
            {value}
          </div>
          {errorMsg !== "" && (
            <div style={{ background: "brown" }}>{errorMsg}</div>
          )}
        </div>
      );
    },
    initialValue: 0
  }
];
