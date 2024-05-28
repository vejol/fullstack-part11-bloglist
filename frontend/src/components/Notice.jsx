const Notice = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    < div className="notice" >
      {message}
    </div >
  )
}

export default Notice