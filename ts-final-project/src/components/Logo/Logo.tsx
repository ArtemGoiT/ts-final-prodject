import css from "./Logo.module.css"

const Logo: React.FC = () => {
  return (
    <div className={css.logo_block}>
      <p className={css.logo}>AquaTrack</p>
      
    </div>
  )
}

export default Logo
