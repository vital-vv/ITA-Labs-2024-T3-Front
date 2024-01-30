import classes from './selector.module.scss';

export default function Selector() {
  return (
    <div className={classes.selector}>
      <div>
        <select id="selector order">
          <option>New ones first</option>
        </select>
      </div>
    </div>
  );
}
