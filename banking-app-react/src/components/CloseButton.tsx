export const CloseButton = () => {
  return (
    <button
      type="button"
      className="close"
      data-dismiss="alert"
      aria-label="Close"
    >
            <span aria-hidden="true">&times;</span>
    </button>
  );
}