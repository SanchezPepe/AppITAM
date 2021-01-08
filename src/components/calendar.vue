<template>
    <div>
        <v-sheet height="1000">
            <v-calendar ref="calendar" :weekdays="weekday" type="week" :events="events" first-time="06:30"
                interval-minutes="30" interval-count="34" :short-intervals="shortIntervals" start="2020-06-01"
                event-overlap-mode="column" :event-overlap-threshold="30" :event-color="getEventColor"
                @change="getEvents"></v-calendar>
        </v-sheet>
    </div>
</template>


<script>
    export default {
        data: () => ({
            weekday: [1, 2, 3, 4, 5, 6],
            shortIntervals: false,
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            events: [{
                name: "TEEEEST",
                start: Date.parse("2020-06-02 09:00:00"),
                end: Date.parse("2020:0602 09:30:00"),
                timed: true
            }],
            names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        }),
        methods: {
            getEvents({
                start,
                end
            }) {
                const events = []

                const min = new Date(`${start.date}T00:00:00`)
                const max = new Date(`${end.date}T18:59:59`)
                //const days = (max.getTime() - min.getTime()) / 86400000
                const eventCount = 10

                for (let i = 0; i < eventCount; i++) {
                    const allDay = this.rnd(0, 3) === 0
                    const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                    const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                    const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                    const second = new Date(first.getTime() + secondTimestamp)

                    events.push({
                        name: this.names[this.rnd(0, this.names.length - 1)],
                        start: first,
                        end: second,
                        color: this.colors[this.rnd(0, this.colors.length - 1)],
                        timed: true,
                    })
                }

                this.events = events
            },
            getEventColor(event) {
                return event.color
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
        },
    }
</script>