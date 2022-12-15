import "../style/Collapsetab.css";
import { GrAddCircle } from "react-icons/gr";
import Collapsible from "react-collapsible";
export default function Collapsetab() {
  return (
    <div className="collapsibletab">
      <div className="collapsibletab_raw">
        <Collapsible
          trigger={
            <div className="collapsibletab_raw_icon">
              <GrAddCircle />
              <label>Collapsible header</label>
            </div>
          }
        >
          <label>
            Collapsed content is content that is hidden by tabs, accordions,
            click-to-expand buttons, or display:none styling.
          </label>
        </Collapsible>
      </div>
    </div>
  );
}
