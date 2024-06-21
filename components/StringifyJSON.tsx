const StringifyJSON = ({ data }: { data: any }) => {
  return (
    <div className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</div>
  );
};

export default StringifyJSON;
