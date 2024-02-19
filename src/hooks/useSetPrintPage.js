let printComponent;

function useSetPrintPage() {
  const setPrintComponent = (comp) => (printComponent = comp);
  return { printComponent, setPrintComponent };
}

export default useSetPrintPage;
