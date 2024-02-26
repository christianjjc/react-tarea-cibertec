export const Footer = () => {
  return (
    <div className="d-flex justify-content-center ">
      <span>© {new Date().getFullYear()} Todos los derechos reservados | Desarrollado por</span> {/* alt + 0169 */}
      <a href="https://cjjc.pe" className="mx-3" target="_blank">
        CJJC
      </a>
    </div>
  );
};
