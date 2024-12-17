interface MessageProps {text: string | null, owner: string | null}

const Message: React.FC<MessageProps>  = ({text, owner}) => {
  return (
    <>
        {owner === "user" ? 
            <div className="bg-gray-500 text-center rounded py-1">
                <p>{text}</p>
            </div> :
            <div className="bg-gray-400 text-center rounded py-1">
                <p>{text}</p>
            </div>
        }
    </>
  );
};

export default Message;