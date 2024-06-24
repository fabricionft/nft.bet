import useMessageBox from "../../../hooks/useMessageBox";
import styles from './MessageBox.module.css';

export default function MessageBox(){

  const {visible, dadosMessageBox, esconder, esconderMessageBoxEDeslogarComoAdmin} = useMessageBox();

  return(
    <>
      {
        visible && (
          <div className={styles.containerMessageBox}>
            <div className={styles.messageBox}>
              <div className={styles.margemMessageBox}>
                <div className={styles.textoMessageBox}>
                  {
                    typeof dadosMessageBox.msg == "string" ? dadosMessageBox.msg
                    : dadosMessageBox.msg.map((msg, index) => (
                      <div key={index}>
                        - {msg}
                      </div>
                    ))
                  }
                </div>

                <button type="button" className={styles.btnMessageBox+" "+styles[(dadosMessageBox.sucesso) ? "sucesso" : "erro"]}
                  onClick={(dadosMessageBox.deslogar) ? esconderMessageBoxEDeslogarComoAdmin : esconder}
                >{dadosMessageBox.txtBotao}</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}