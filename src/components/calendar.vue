<template>
    <div>
        <v-container>
            <v-sheet height="1000">
                <!-- <v-calendar ref="calendar" :weekdays="weekday" type="week" :events="events" first-time="06:30"
                    interval-minutes="30" interval-count="34" :short-intervals="shortIntervals" start="2020-06-01"
                    :event-overlap-mode="mode" event-overlap-threshold="15" :event-color="getEventColor"
                    @click:event="showEvent" @click:more="viewDay" @click:date="viewDay">
                </v-calendar> -->

                <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
                    type="week" @click:event="showEvent" @click:more="viewDay" @click:date="viewDay"
                    @change="updateRange"></v-calendar>
            </v-sheet>
        </v-container>
    </div>
</template>


<script>
    export default {
        data: () => ({
            focus: "",
            weekday: [1, 2, 3, 4, 5, 6],
            mode: "column",
            shortIntervals: false,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            events: [{
                    color: "green",
                    name: "SEMINARIO DE INVESTIGACION ACT",
                    start: new Date("2020-06-02 09:00:00"),
                    end: new Date("2020-06-02 12:30:00"),
                    timed: true
                },
                {
                    color: "blue",
                    name: "SEMINARIO DE INVESTIGACION ACT",
                    start: new Date("2020-06-02 09:15:00"),
                    end: new Date("2020-06-02 12:30:00"),
                    timed: true
                }
            ]
        }),
        mounted() {
            this.$refs.calendar.checkChange()
        },
        methods: {
            viewDay({
                date
            }) {
                this.focus = date
                this.type = 'day'
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = ''
            },
            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            showEvent({
                nativeEvent,
                event
            }) {
                const open = () => {
                    this.selectedEvent = event
                    this.selectedElement = nativeEvent.target
                    setTimeout(() => {
                        this.selectedOpen = true
                    }, 10)
                }

                if (this.selectedOpen) {
                    this.selectedOpen = false
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },

            updateRange({
                start,
                end
            }) {
                const events = []

                const min = new Date(`${start.date}T00:00:00`)
                const max = new Date(`${end.date}T23:59:59`)
                const days = (max.getTime() - min.getTime()) / 86400000
                const eventCount = this.rnd(days, days + 20)

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
                        timed: !allDay,
                    })
                }

                this.events = events
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },

        }
    }
</script>