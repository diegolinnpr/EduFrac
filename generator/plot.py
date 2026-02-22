import matplotlib.pyplot as plt
import numpy as np
import os

def shear4(points, mouse_x, mouse_y):
    """
    Linear shear in XY-plane. Points with z=0 do not move, points with
    z=old_corner4[2] are fully shifted to align the fourth corner to (mouse_x, mouse_y)
    """
    old_corner4 = np.array([0.5, 0.28867513, 0.81649658])
    n_points = len(points)

    # shear amounts needed to move corner4 to mouse position
    x_shear = mouse_x - old_corner4[0]
    y_shear = mouse_y - old_corner4[1]

    sheared = np.empty_like(points)
    for i in range(n_points):
        z_frac = points[i, 2] / old_corner4[2]  # fraction of height
        sheared[i, 0] = points[i, 0] + x_shear * z_frac
        sheared[i, 1] = points[i, 1] + y_shear * z_frac
        sheared[i, 2] = points[i, 2]

    return sheared

def interactive_2d_plot(points, corners, N_PLOT=100_000, dot_size=0.5, opacity=0.5):
    """
    2D XY-plane interactive scatter plot.
    Mouse movement updates the 4th corner and shears points in real time.
    """
    if len(points) > N_PLOT:
        idx = np.random.choice(len(points), N_PLOT, replace=False)
        points_to_plot = points[idx]
    else:
        points_to_plot = points.copy()

    fig, ax = plt.subplots(figsize=(8,8))

    scatter = ax.scatter(points_to_plot[:,0], points_to_plot[:,1],
                         s=dot_size, alpha=opacity)
    corner_scatter = ax.scatter(corners[:,0], corners[:,1],
                                color='red', s=50)

    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    ax.set_title("Interactive Sheared Tetrahedron (XY projection)")

    def on_move(event):
        if event.xdata is None or event.ydata is None:
            return

        mouse_x = event.xdata
        mouse_y = event.ydata

        sheared = shear4(points_to_plot, mouse_x, mouse_y)

        # Update scatter offsets
        scatter.set_offsets(sheared[:, :2])

        # Update 4th corner
        new_corners = corners.copy()
        new_corners[-1, 0] = mouse_x
        new_corners[-1, 1] = mouse_y
        corner_scatter.set_offsets(new_corners[:, :2])

        fig.canvas.draw_idle()

    fig.canvas.mpl_connect("motion_notify_event", on_move)
    plt.show()


if __name__ == "__main__":
    data = np.load('/Users/tobiaswatters/Desktop/DSproj/point_data/trigonal bipyramidal.npz')
    points = data["points"]
    corners = data["corners"]
    interactive_2d_plot(points, corners, N_PLOT=10_000, opacity=0.2)