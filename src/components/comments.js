export default function Comments ({ dataComments, setCommentsStatus }) {
  const closeComments = () => {
    setCommentsStatus(false)
  }

  return (
    <div>
      <div>
        {
          dataComments.map((comment, index) => {
            return (
              <div key={index} >
                {comment.description}
              </div>
            )
            }
          )
        }
      </div>

      <div>
        <span onClick={closeComments} >
          <button>Close Coments</button>
        </span>
      </div>
    </div>

  )
}