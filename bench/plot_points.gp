# Let's output to an SVG file
set terminal svg size 600,400 dynamic enhanced fname 'Helvetica'
# This sets the aspect ratio of the graph
set size 1, 1
# The file we'll write to
set output "bench/auth_points.svg"
# The graph title
set title "Benchmark testing"
# Where to place the legend/key
set key left top
# Draw gridlines oriented on the y axis
set grid y
# Specify that the x-series data is time data
set xdata time
# Specify the *input* format of the time data
set timefmt "%s"
# Specify the *output* format for the x-axis tick labels
set format x "%S"
# Label the x-axis
set xlabel 'seconds'
# Label the y-axis
set ylabel "response time (ms)"
# Tell gnuplot to use tabs as the delimiter instead of spaces (default)
set datafile separator '\t'
# Plot the data
plot "bench/auth.tsv" every ::2 using 2:5 title 'response time' with points
exit