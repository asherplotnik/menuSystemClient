import "./Backdrop.css";

interface BackdropProps {
  clicked: Function;
  show: boolean;
}

const Backdrop = (props: BackdropProps) => {
  return props.show ? (
    <div className="Backdrop" onClick={() => props.clicked()}></div>
  ) : (
    <></>
  );
};
export default Backdrop;
