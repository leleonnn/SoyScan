(defrule MAIN::btwn100and120
  (part-credits ?val)
  (test (<= ?val 120))
  (test (>= ?val 100))
=>
  (printout t "Value " ?val " is in range." crlf)
)