const Message = ({ variant, children }) => {
      
      return <div className={`alert alert-${variant} alert-dismissible fade show`}>{children}</div>
};

Message.defaultProps = {
      variant: "info"
}

export default Message;