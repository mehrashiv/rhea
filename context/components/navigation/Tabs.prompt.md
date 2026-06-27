Underline tab switch for the two primary views (Feed / My Photos). Controlled — pass `value` and `onChange`.

```jsx
const [tab, setTab] = React.useState("feed");
<Tabs
  tabs={[{value:"feed",label:"Feed"},{value:"mine",label:"My Photos"}]}
  value={tab}
  onChange={setTab}
/>
```

Active tab gets ink text + a 2px lilac underline; inactive is faint.
