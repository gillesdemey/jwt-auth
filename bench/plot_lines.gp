# Let's output to an SVG file
set terminal svg size 600,400 dynamic enhanced fname 'Helvetica'
# This sets the aspect ratio of the graph
set size 1, 1
# The file we'll write to
set output "bench/auth_lines.svg"
# The graph title
set title "Benchmark testing"
# Where to place the legend/key
set key left top
# Draw gridlines oriented on the y axis
set grid y
# Label the x-axis
set xlabel 'requests'
# Label the y-axis
set ylabel "response time (ms)"
# Tell gnuplot to use tabs as the delimiter instead of spaces (default)
set datafile separator '\t'
# Plot the data
plot "bench/auth.tsv" every ::2 using 5 title 'response time' with lines
exit