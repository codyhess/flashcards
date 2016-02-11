from bs4 import BeautifulSoup

# open the file
# (I just curl'd this from https://developer.mozilla.org/en-US/docs/Web/Events)
soup = BeautifulSoup(open('events.html'), "html5lib")

# get the events we want
rows = soup.find('table', class_='standard-table').findAll('tr')

# ignore the first row
rows.pop(0)

# this is just showing off
questions_and_answers = [(td[0].get_text(), td[3].get_text())
        for td in [tds.findAll('td')
        for tds in [row for row in rows]]]

eventsjs = open('events.js', 'w')
eventsjs.seek(0)
eventsjs.truncate()

eventsjs.write("var eventsDeck = {\n")

for qa in questions_and_answers:
    eventsjs.write("'"+qa[1].replace("'", "\\'")+"':'"+qa[0].replace("'", "\\'")+"',\n")

eventsjs.write("}")
eventsjs.close()
