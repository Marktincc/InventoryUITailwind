import { Card } from "../ui/card"

export const SalesAlertsDashboard = ({ alerts }) => {
  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-blue-500 bg-gray-800">
        <header className="pb-2">
          <div className="flex justify-between items-start p-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Alertas de Ventas</h2>
              <p className="text-sm text-gray-400">Información importante sobre ventas recientes</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                {alerts?.length || 0} Alertas
              </span>
            </div>
          </div>
        </header>
        <div className="p-4 space-y-4">
          {alerts?.map((alert, idx) => (
            <div key={alert.id || idx} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <div>
                <h3 className="font-medium text-white">{alert.titulo || alert.productoNombre || 'Venta importante'}</h3>
                <p className="text-sm text-gray-400">
                  {alert.mensaje || `Cantidad vendida: ${alert.cantidad}, Valor: $${alert.valor_total || alert.valor}`}
                </p>
              </div>
            </div>
          ))}
          {(!alerts || alerts.length === 0) && (
            <div className="text-center py-4 text-gray-400">
              No hay alertas de ventas importantes
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
