(defrule error
    (or (vape 0)
    (exercise 0)
    (junkfood 0))
    =>
    (printout t "Error. Please input the numbers, making sure it is according to the rule." crlf)
)


(defrule heartattack
    (and (exercise 2 | 3)
         (vape 1 | 3 )
         (junkfood 1 | 3))
    =>
    (assert (diagnose heartattack))
    (printout t "Possible cancer risk, unknown type. You are going to die." crlf)
)

(defrule cancer
    (and (exercise 2 | 3)
         (vape 1 | 3 )
         (junkfood 1 | 3))
    =>
    (assert (diagnose cancer))
    (printout t "Possible cancer risk, unknown type. You are going to die." crlf)
)

(defrule healthy
    (and (exercise 1)
         (vape 2)
         (junkfood 2 | 3))
    =>
    (assert (diagnose heartattack))
    (printout t "Possible cancer risk, unknown type. You are going to die." crlf)
)

(defrule baselinehealthy
    (and (exercise 1 | 3)
         (vape 2 | 3 )
         (junkfood 2 | 3))
    =>
    (assert (diagnose heartattack))
    (printout t "Possible cancer risk, unknown type. You are going to die." crlf)
)

(defrule input
    =>
    (printout t crlf "Do you exercise? 1 for yes, 2 for no, 3 for sometimes.")
    (assert (exercise =(read)))
    (printout t crlf "Do you smoke / vape? 1 for yes, 2 for no, 3 for sometimes.")
    (assert (vape =(read)))
    (printout t crlf "Do you eat junk foods? 1 for yes, 2 for no, 3 for sometimes.")
    (assert (junkfood =(read)))
    (printout t crlf "Rekomendasi Dokter Drago : " crlf)
)