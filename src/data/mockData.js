export const inventoryData = [
  { id: 1, category: 'Cooling', total: 450, lowStock: 12, expiring: 5 },
  { id: 2, category: 'Air Quality', total: 320, lowStock: 8, expiring: 3 },
  { id: 3, category: 'Smart Home', total: 280, lowStock: 4, expiring: 6 },
  { id: 4, category: 'Filtration', total: 290, lowStock: 2, expiring: 2 },
];

export const topInventory = [
  { name: 'Portable AC Units', value: 35, color: '#555555' },
  { name: 'Air Purifiers', value: 25, color: '#777777' },
  { name: 'Filter', value: 20, color: '#999999' },
  { name: 'Smart Thermostats', value: 20, color: '#bbbbbb' },
];

export const notificationsData = [
  { id: 1, product: 'Portable AC', currentStock: 12, category: 'Cooling', quantity: 30, date: 'July 13, 2026', status: 'Low stock' },
  { id: 2, product: 'Smart Fan X200', currentStock: 13, category: 'Cooling', quantity: 12, date: 'July 10, 2026', status: 'New Product' },
  { id: 3, product: 'PO-1002 CoolTech', currentStock: '-', category: '-', quantity: '-', date: '-', status: 'Purchase' },
  { id: 4, product: 'Warehouse capacity exceeded.', currentStock: '-', category: '-', quantity: '-', date: 'July 10, 2026', status: 'Critical' },
  { id: 5, product: 'Warehouse Inspection', currentStock: '-', category: '-', quantity: '-', date: 'July 13, 2026', status: 'Maintenance' },
];

export const ordersData = [
  { orderId: 'ORD-001', customer: 'Clara Dela Cruz', product: 'Portable AC', quantity: 2, status: 'Pending' },
  { orderId: 'ORD-002', customer: 'Mark Bautista', product: 'Air Purifier', quantity: 1, status: 'Pending' },
  { orderId: 'ORD-003', customer: 'Diego Marasigan', product: 'Smart Thermostat', quantity: 3, status: 'Pending' },
  { orderId: 'ORD-004', customer: 'Liza Contastino', product: 'Filter Pack', quantity: 5, status: 'Completed' },
];

export const powerUsageData = [
  { id: 1, date: '2026-07-01', area: 'Main Warehouse', kwh: 450, cost: '₱5,400', status: 'Normal' },
  { id: 2, date: '2026-07-02', area: 'Cold Storage', kwh: 890, cost: '₱10,680', status: 'High' },
  { id: 3, date: '2026-07-03', area: 'Office AC', kwh: 320, cost: '₱3,840', status: 'Normal' },
  { id: 4, date: '2026-07-04', area: 'Display Floor', kwh: 1200, cost: '₱14,400', status: 'Critical' },
];

export const chatLogs = [
  'Clara Dela Cruz', 'Angelm Stith', 'Tavlor Doe', 
  'Liza Contastino', 'Mark Bautista', 'Diego Marasigan'
];

export const purchaseHistory = [
  { id: 'PUR-001', batchId: 'B-2026-001', product: 'Portable AC', quantity: 50, date: '2026-07-01', total: '₱150,000' },
  { id: 'PUR-002', batchId: 'B-2026-002', product: 'Air Purifier', quantity: 30, date: '2026-07-05', total: '₱90,000' },
];