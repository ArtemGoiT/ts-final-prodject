import { useTransition } from "react";
import css from "../AddWaterBtn/AddWaterBtn.module.css"

interface AddWaterBtnProps {
    onClick: () => void;
    inDetails?: boolean;
}



const AddWaterBtn: React.FC<AddWaterBtnProps> = ({onClick, inDetails}) => {
    const {t} = useTransition();
  return (!inDetails ? (
    <button type="button" className={css.btnAdd} onClick={onClick}>
        <svg className={css.plus}>
            <use xlinkHref= {`${sprite}#icon-plus-wide`}/>
        </svg>
  <h2 className={css.btnText}>
    {t("addWaterBtn.addWater")}
  </h2>
</button>  ) : (
    <button type="button" className={css.detailsBtnAdd} onClick={onClick}>
        <div className={css.detailsAddContainer}>
            
            
            </div>  
      
    
  


export default AddWaterBtn

