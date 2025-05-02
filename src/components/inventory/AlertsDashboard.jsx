import { Card } from "../ui/card"

export const AlertsDashboard = ({ alerts }) => {
  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-red-500 bg-gray-800">
        <header className="pb-2">
          <div className="flex justify-between items-start p-4">
            <div>
              <h2 className="text-lg font-semibold text-white">Alertas de Inventario</h2>
              <p className="text-sm text-gray-400">Productos que requieren atención</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                {alerts?.length || 0} Alertas
              </span>
            </div>
          </div>
        </header>
        <div className="p-4 space-y-4">
          {alerts?.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
              <div>
                <h3 className="font-medium text-white">{alert.nombreProducto}</h3>
                <p className="text-sm text-gray-400">
                  Stock actual: {alert.cantidad} | Umbral: 10
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  onClick={() => alert.onResolve && alert.onResolve(alert.id)}
                >
                  Marcar como resuelto
                </button>
              </div>
            </div>
          ))}
          {(!alerts || alerts.length === 0) && (
            <div className="text-center py-4 text-gray-400">
              No hay alertas pendientes
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}