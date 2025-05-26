// src/app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard 
        title="Total Games" 
        value={28} 
        icon={<Gamepad />}
        animation="bounce"
      />
      <StatsCard 
        title="Completed" 
        value={15} 
        icon={<Trophy />}
        animation="slide"
      />
      <StatsCard 
        title="Hours Played" 
        value={340} 
        icon={<Clock />}
        animation="fade"
      />
      
      <div className="col-span-3">
        <GameProgressChart />
      </div>
    </div>
  )
}