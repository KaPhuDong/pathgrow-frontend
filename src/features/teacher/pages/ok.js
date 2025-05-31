<Main1>
  {isLoading && <Loading />}

  <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    }}
    initialView="timeGridWeek"
    selectable={true}
    select={handleSelect}
    events={events}
    eventClick={handleEventClick}
    height="auto"
    dayMaxEvents={3}
    allDaySlot={false}
    slotMinTime="07:30:00"
    slotMaxTime="22:00:00"
    nowIndicator
  />

  {selectedRange && formPosition && (
    <AddEvent
      datetime={selectedRange}
      onAdd={addEvent}
      onCancel={() => {
        setSelectedRange(null);
        setFormPosition(null);
      }}
    />
  )}

  {deleteInfo && (
    <DeleteEvent
      eventInfo={deleteInfo.eventInfo}
      position={deleteInfo.position}
      onConfirm={confirmDelete}
      onCancel={() => setDeleteInfo(null)}
    />
  )}
</Main1>;
