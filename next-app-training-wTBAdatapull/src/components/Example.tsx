const Example = ( param ) => {
  return (
    <div className=''>This is the text in example component file "src/components/Example.tsx". 
    {(param.parameter && " And a value was passed to the component: " + param.parameter)}</div>
  )
}

export default Example